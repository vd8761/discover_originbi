export const SUPPORTED_BOARDS = [
    { value: "STATE_BOARD", label: "State Board", enabled: true },
    { value: "CBSE", label: "CBSE", enabled: true },
    { value: "ICSE", label: "ICSE", enabled: false }, // Pending Questions
    { value: "IGCSE", label: "IGCSE", enabled: false }, // Pending Questions
    { value: "IB", label: "IB", enabled: false }, // Pending Questions
    { value: "OTHER", label: "Other", enabled: false },
];

export const getEnabledBoards = () => SUPPORTED_BOARDS.filter((b) => b.enabled);
