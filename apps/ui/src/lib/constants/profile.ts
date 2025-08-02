export const PROFILE_STYLES = {
  container: 'max-w-4xl mx-auto px-6',
  card: 'bg-white dark:bg-surface-800 rounded-2xl shadow-xl overflow-hidden border border-surface-100 dark:border-surface-700',
  header:
    'bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-8 border-b border-surface-100 dark:border-surface-700',
  headerContent: 'flex flex-col items-center',
  avatar:
    'w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-surface-700 overflow-hidden ring-4 ring-primary-100 dark:ring-primary-900/30',
  headerInfo: 'text-center mt-6',
  title:
    'text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-2',
  subtitle: 'text-surface-600 dark:text-surface-400 text-lg',
  content: 'px-6 space-y-0 pb-24',
  section: 'py-8 border-b border-surface-200 dark:border-surface-700 last:border-b-0',
  sectionGrid: 'py-8 border-b border-surface-200 dark:border-surface-700',
  sectionTitle:
    'text-xl font-semibold text-surface-900 dark:text-surface-50 mb-6 flex items-center gap-3',
  actionBar:
    'bg-white/95 dark:bg-surface-800/95 backdrop-blur-sm border-t border-surface-200 dark:border-surface-700 py-3 md:static md:relative md:bottom-auto md:left-auto md:right-auto md:mt-4 md:rounded-xl fixed bottom-0 left-0 right-0 shadow-lg z-[9999]',
} as const;

export const PROFILE_SECTIONS = {
  BASIC_INFO: 'basic-info',
  LOCATION: 'location',
  SUBJECTS: 'subjects',
  BIO: 'bio',
  PREFERENCES: 'preferences',
  PRICING: 'pricing',
  AUDIO: 'audio',
  PASSWORD: 'password',
} as const;
