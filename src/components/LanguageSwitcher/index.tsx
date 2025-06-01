import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css"
import i18n from "../../i18n"

export const LanguageSwitcher = () => {
    const { t } = useTranslation();
    const currentLang = i18n.language;

    return (
        <div className="wrapper">
            <button
                className={`lang-button ${currentLang.startsWith('en') ? 'active' : ''}`}
                disabled={currentLang.startsWith('en')}
                onClick={() => i18n.changeLanguage('en')} 
            >
                {t('lang.en')}
            </button>
            <button
                className={`lang-button ${currentLang.startsWith('es') ? 'active' : ''}`}
                disabled={currentLang.startsWith('es')}
                onClick={() => i18n.changeLanguage('es')}
            >
                {t('lang.es')}
            </button>
        </div>
    )
}