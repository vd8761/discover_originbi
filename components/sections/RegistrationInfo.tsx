import { T, useTranslation } from "@/contexts/LanguageContext";

const RegistrationInfo: React.FC<{ className?: string }> = ({ className = "" }) => {
    const { t } = useTranslation();

    const valueProps = [
        {
            title: t("The Science of You"),
            icon: "biotech",
            description: t("Unlock the data behind your daily decisions.")
        },
        {
            title: t("Beyond Academics"),
            icon: "psychology",
            description: t("Success is more than just grades.")
        },
        {
            title: t("Future Ready"),
            icon: "rocket_launch",
            description: t("Prepare for careers that don't exist yet.")
        },
        {
            title: t("Relationship Dynamics"),
            icon: "diversity_3",
            description: t("Master the art of connecting with others.")
        }
    ];

    const parentOutcomes = [
        {
            icon: "family_restroom",
            text: t("Bridging the gap between generations with shared understanding.")
        },
        {
            icon: "menu_book",
            text: t("Learning strategies that match your natural cognitive style.")
        }
    ];

    return (
        <div className={`h-full flex flex-col overflow-hidden ${className}`}>
            <div className="flex-1 flex flex-col justify-start px-4 lg:px-12 py-4 lg:pt-4">

                {/* Hero / Intro */}
                <div className="mb-4 text-center lg:text-left">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-brand-dark-primary dark:text-white drop-shadow-sm">
                        {/* @ts-ignore */} <T> Unlock Your Full Potential </T> </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 italic">
                        {/* @ts-ignore */} <T> "Insights Discovery transforms your performance using the power of awareness." </T> </p>
                </div>

                {/* Value Props Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {valueProps.map((item, index) => (
                        <div key={index} className="bg-white/50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/10 backdrop-blur-sm group hover:border-brand-green/30 transition-all">
                            <div className="text-2xl mb-1 text-brand-green">
                                <span className="material-symbols-outlined !text-[32px]">{item.icon}</span>
                            </div>
                            <h3 className="font-bold text-sm text-brand-dark-primary dark:text-white mb-0.5">{item.title}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Parent Information Section */}
                <div className="bg-brand-green/5 dark:bg-brand-green/10 rounded-2xl p-4 border border-brand-green/10">
                    <h3 className="font-bold text-base text-brand-dark-primary dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-brand-green rounded-full"></span>
                        {/* @ts-ignore */} <T> For Parents & Students </T> </h3>
                    <div className="space-y-2">
                        {parentOutcomes.map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                                <span className="text-brand-green mt-0.5">
                                    <span className="material-symbols-outlined !text-[20px]">{item.icon}</span>
                                </span>
                                <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust/Testimonial Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 text-center lg:text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {/* @ts-ignore */} <T> Join thousands of students discovering their path with Origin BI. </T> </p>
                </div>

            </div>

        </div>
    );
};

export default RegistrationInfo;
