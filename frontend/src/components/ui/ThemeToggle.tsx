import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon } from '../../icons/SunIcon';
import { MoonIcon } from '../../icons/MoonIcon';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700 focus-ring"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="relative w-6 h-6">
                <div
                    className={`absolute inset-0 transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'
                        }`}
                >
                    <SunIcon className="text-yellow-500" />
                </div>
                <div
                    className={`absolute inset-0 transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                        }`}
                >
                    <MoonIcon className="text-indigo-400" />
                </div>
            </div>
        </button>
    );
};
