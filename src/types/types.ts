

export type StartMenuButtonPropsType = {
    label: string;
    selected: boolean;
    onClick: () => void;
};

export type StartMenuSettingsType = {
    id: number;
    title: string;
    buttons: StartMenuButtonType[];
};

export type StartMenuButtonType = {
    type: string;
    label: string;
    selected: boolean;
};

export type SelectedSettingsType = {
    theme: string;
    playerNumbers: number;
    grid: string;
};

export type MemoryPieceType = {
    memoryPiece: string | number;
    taken: boolean;
    isClicked: boolean;
};

export type PlayersType = {
    player: number;
    score: number;
    selected: boolean;
    winner?: boolean;
};

export type ModalsType = {
    lightbox: boolean;
    menu: boolean;
    winner: boolean;
};
