const VENDOR = { MELON: 'melon', GENIE: 'genie', VIBE: 'vibe' } as const;

export type Vendor = typeof VENDOR[keyof typeof VENDOR];
