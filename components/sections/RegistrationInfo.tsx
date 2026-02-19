import React from 'react';

const RegistrationInfo: React.FC<{ className?: string }> = ({ className = "" }) => {

    const valueProps = [
        {
            title: "The Science of You",
            icon: "🧬",
            description: "Unlock the data behind your daily decisions."
        },
        {
            title: "Beyond Academics",
            icon: "🌱",
            description: "Success is more than just grades."
        },
        {
            title: "Future Ready",
            icon: "🚀",
            description: "Prepare for careers that don't exist yet."
        },
        {
            title: "Relationship Dynamics",
            icon: "🤝",
            description: "Master the art of connecting with others."
        }
    ];

    const parentOutcomes = [
        {
            icon: "👨‍👩‍👧‍👦",
            text: "Bridging the gap between generations with shared understanding."
        },
        {
            icon: "📚",
            text: "Learning strategies that match your natural cognitive style."
        }
    ];

    return (
        <div className={`h-full flex flex-col overflow-hidden ${className}`}>
            <div className="flex-1 flex flex-col justify-start px-4 lg:px-12 py-4 lg:pt-4">

                {/* Hero / Intro */}
                <div className="mb-4 text-center lg:text-left">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-brand-dark-primary dark:text-white drop-shadow-sm">
                        Unlock Your Full Potential
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 italic">
                        "Insights Discovery transforms your performance using the power of awareness."
                    </p>
                </div>

                {/* Value Props Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {valueProps.map((item, index) => (
                        <div key={index} className="bg-white/50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/10 backdrop-blur-sm">
                            <div className="text-2xl mb-1">{item.icon}</div>
                            <h3 className="font-bold text-sm text-brand-dark-primary dark:text-white mb-0.5">{item.title}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Parent Information Section */}
                <div className="bg-brand-green/5 dark:bg-brand-green/10 rounded-2xl p-4 border border-brand-green/10">
                    <h3 className="font-bold text-base text-brand-dark-primary dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-brand-green rounded-full"></span>
                        For Parents & Students
                    </h3>
                    <div className="space-y-2">
                        {parentOutcomes.map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                                <span className="text-lg mt-0.5">{item.icon}</span>
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
                        Join thousands of students discovering their path with Origin BI.
                    </p>
                </div>

            </div>

            {/* Background Decoration (Optional, can be removed if specific page background is used) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 -z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10 pointer-events-none"></div>

        </div>
    );
};

export default RegistrationInfo;
