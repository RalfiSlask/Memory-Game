

export type StartMenuButtonPropsType = {
    label: string;
    selected: boolean;
    onClick: () => void;
};

export type startMenuSettingsType = {
    id: number;
    title: string;
    buttons: startMenuButtonType[];
};

export type startMenuButtonType = {
    type: string;
    label: string;
    selected: boolean;
};