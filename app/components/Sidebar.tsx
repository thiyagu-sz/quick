'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Upload, 
  MessageSquare, 
  Bookmark, 
  Download, 
  User,
  LogOut,
  X,
  Menu,
  Clock,
  Trash2
} from 'lucide-react';
import { getSupabaseClient, clearSupabaseClient } from '@/app/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StatusModal from './StatusModal';
import ConfirmationModal from './ConfirmationModal';

interface SidebarProps {
  user?: {
    id?: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
    };
  } | null;
}

interface ChatConversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatConversation[]>([]);
  const [showAllChats, setShowAllChats] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [statusModal, setStatusModal] = useState({
    show: false,
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
    title: '',
    message: '',
  });

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setChatToDelete(chatId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteChat = async () => {
    if (!chatToDelete) return;
    
    const chatId = chatToDelete;
    const previousHistory = [...chatHistory];
    
    // Optimistic Update: Remove from local state immediately
    setChatHistory(prev => prev.filter(c => c.id !== chatId));
    setDeletingId(chatId);
    setShowDeleteConfirm(false);

    try {
      const supabase = getSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`/api/chat/delete?id=${chatId}`, {
        method: 'DELETE',
        headers: {
          ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` }),
        },
      });

      if (!response.ok) {
        // Restore previous state if API fails
        setChatHistory(previousHistory);
        setStatusModal({
          show: true,
          type: 'error',
          title: 'Delete Failed',
          message: 'Failed to delete conversation. Please try again.',
        });
      } else {
        // Dispatch global event for sync
        window.dispatchEvent(new CustomEvent('chatDeleted', { detail: { chatId } }));
        
        // If we're viewing this chat, redirect to /chat
        if (pathname === `/chat` && window.location.search.includes(chatId)) {
          router.push('/chat');
        }
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      setChatHistory(previousHistory);
      setStatusModal({
        show: true,
        type: 'error',
        title: 'Error',
        message: 'An error occurred while deleting the conversation.',
      });
    } finally {
      setDeletingId(null);
      setChatToDelete(null);
    }
  };

  const loadChatHistory = async (userId: string) => {
    try {
      const supabase = getSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      // Limit to 3 conversations for sidebar display
      const response = await fetch('/api/chat/history?limit=3', {
        headers: {
          ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` }),
        },
      });

      if (response.ok) {
        const data = await response.json();
        const conversations = data.conversations || [];
        console.log('Chat history loaded:', conversations.length, 'conversations');
        console.log('Conversations:', conversations);
        setChatHistory(conversations);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to load chat history:', response.status, errorData);
        setChatHistory([]);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      setChatHistory([]);
    }
  };

  useEffect(() => {
    const supabase = getSupabaseClient();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Clear history immediately on auth change to prevent cross-user leakage
      if (event === 'SIGNED_OUT' || event === 'USER_UPDATED' || event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') {
        setChatHistory([]);
        setUserEmail('');
        
        // Force a UI refresh for chat list if on the chat page
        if (pathname === '/chat') {
          window.dispatchEvent(new CustomEvent('authChangeClear'));
        }
      }

      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session?.user) {
          setUserEmail(session.user.email || '');
          loadChatHistory(session.user.id);
        }
      }
    });

    const fetchUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        setUserEmail(currentUser.email || '');
        loadChatHistory(currentUser.id);
      }
    };
    fetchUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname]);

  // Sync with global chat events
  useEffect(() => {
    const handleSync = async () => {
      const supabase = getSupabaseClient();
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        await loadChatHistory(currentUser.id);
      }
    };

    window.addEventListener('chatSaved', handleSync);
    window.addEventListener('chatDeleted' as any, handleSync);
    
    return () => {
      window.removeEventListener('chatSaved', handleSync);
      window.removeEventListener('chatDeleted' as any, handleSync);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      const supabase = getSupabaseClient();
      
      // Get current user ID before signing out to clear their localStorage
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      // 1. Clear session first
      await supabase.auth.signOut();
      
      // 2. Clear singleton instance
      clearSupabaseClient();
      
      // 3. Clear local state
      setChatHistory([]);
      setUserEmail('');
      
      // 4. Clear user-specific localStorage data
      if (currentUser?.id) {
        try {
          localStorage.removeItem(`ai_chat_draft_${currentUser.id}`);
        } catch (e) { /* ignore */ }
      }
      
      // 5. Use hard redirect to ensure zero state leakage and fix "stuck loading" bug
      // Using window.location.href instead of router.push ensures a fresh browser state
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during sign out:', error);
      // Fallback redirect if something fails
      window.location.href = '/login';
    }
  };

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/upload', icon: Upload, label: 'Upload' },
    { href: '/chat', icon: MessageSquare, label: 'AI Assistant' },
  ];

  const libraryItems = [
    { href: '/saved', icon: Bookmark, label: 'Saved Items' },
    { href: '/exports', icon: Download, label: 'Exports' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`h-[100dvh] w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40 transform transition-transform duration-300 lg:relative lg:z-auto ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img 
              src="/applogo.png?v=3" 
              alt="QuickNotes Logo" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Chat History - Show section if on chat page */}
        {pathname === '/chat' && (
          <div className="pt-6 mt-6 border-t border-gray-200">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Previous Conversations
            </p>
            {chatHistory.length > 0 ? (
              <>
                {chatHistory.map((chat) => (
                  <div key={chat.id} className="group relative">
                    <Link
                      href={`/chat?id=${chat.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-gray-700 hover:bg-gray-50 pr-10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm truncate flex-1">{chat.title}</span>
                    </Link>
                    <button
                      onClick={(e) => handleDeleteChat(e, chat.id)}
                      disabled={deletingId === chat.id}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-gray-500">No saved conversations yet</p>
              </div>
            )}
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-gray-200">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Library
          </p>
          {libraryItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
      </div>
      
      {/* Modals */}
      <ConfirmationModal
        show={showDeleteConfirm}
        title="Delete Conversation"
        message="Are you sure you want to delete this conversation? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDeleteChat}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setChatToDelete(null);
        }}
        isLoading={deletingId !== null}
      />

      <StatusModal
        show={statusModal.show}
        type={statusModal.type}
        title={statusModal.title}
        message={statusModal.message}
        onClose={() => setStatusModal(prev => ({ ...prev, show: false }))}
      />
    </>
  );
}

