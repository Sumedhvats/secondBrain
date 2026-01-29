import { useToast } from '../../hooks/useToast';
import { CrossIcon } from '../../icons/CrossIcon';

export const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`
            pointer-events-auto
            min-w-[300px] max-w-md
            px-4 py-3 rounded-lg shadow-lg
            flex items-center justify-between gap-3
            animate-slide-in
            backdrop-blur-md
            ${toast.type === 'success' ? 'bg-green-500/90 text-white' : ''}
            ${toast.type === 'error' ? 'bg-red-500/90 text-white' : ''}
            ${toast.type === 'warning' ? 'bg-yellow-500/90 text-white' : ''}
            ${toast.type === 'info' ? 'bg-blue-500/90 text-white' : ''}
          `}
                >
                    <span className="flex-1 text-sm font-medium">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                        aria-label="Close notification"
                    >
                        <CrossIcon />
                    </button>
                </div>
            ))}
        </div>
    );
};
