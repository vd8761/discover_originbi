export const SUPPORTED_BOARDS = [
    { value: "STATE_BOARD", label: "State Board", description: "State Government Board of Examinations", enabled: true },
    { value: "CBSE", label: "CBSE", description: "Central Board of Secondary Education", enabled: true },
    { value: "ICSE", label: "ICSE", description: "Council for the Indian School Certificate Examinations", enabled: false }, // Pending Questions
    { value: "IGCSE", label: "IGCSE", description: "International General Certificate of Secondary Education", enabled: true },
    { value: "IB", label: "IB", description: "International Baccalaureate", enabled: false }, // Pending Questions
    { value: "OTHER", label: "Other", description: "Other Educational Boards", enabled: false },
];

export const getEnabledBoards = () => SUPPORTED_BOARDS.filter((b) => b.enabled);
