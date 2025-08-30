import type { InputType } from '@/types';

interface TabSwitcherProps {
  activeTab: InputType;
  onTabChange: (tab: InputType) => void;
  disabled?: boolean;
}

export const TabSwitcher = ({ activeTab, onTabChange, disabled = false }: TabSwitcherProps) => {
  return (
    <div className="tab-switcher">
      <button
        type="button"
        className={`tab-switcher__tab ${activeTab === 'text' ? 'tab-switcher__tab--active' : ''}`}
        onClick={() => onTabChange('text')}
        disabled={disabled}
      >
        &gt; Texto
      </button>

      <button
        type="button"
        className={`tab-switcher__tab ${activeTab === 'file' ? 'tab-switcher__tab--active' : ''}`}
        onClick={() => onTabChange('file')}
        disabled={disabled}
      >
        &gt; Arquivo
      </button>
    </div>
  );
};