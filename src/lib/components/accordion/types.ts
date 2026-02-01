// The shape of the accordion context.

/**
 * Options for creating the accordion context.
 */
export interface AccordionOptions {
	single?: boolean;
	defaultExpanded?: string[];
	onExpandedChange?: (expandedIds: string[]) => void;
}

/**
 * The shape of the accordion context.
 */
export interface AccordionContext {
    /** Set of currently expanded item IDs */
    readonly expandedIds: ReadonlySet<string>;

    /** Whether only one item can be open at a time */
    readonly single: boolean;

    /** Toggle an item's expanded state */
    toggle(id: string): void;

    /** Check if an item is expanded */
    isExpanded(id: string): boolean;

    /** Expand a specific item */
    expand(id: string): void;

    /** Collapse a specific item */
    collapse(id: string): void;

    /** Collapse all items */
    collapseAll(): void;

    /** Update whether only one item can be open */
    setSingle(value: boolean): void;

    /** Update expanded-change callback */
    setOnExpandedChange(cb: ((expandedIds: string[]) => void) | undefined): void;
}

/**
 * Options for creating the accordion context.
 */
export interface AccordionOptions {
    /** Allow only one item open at a time */
    single?: boolean;

    /** Initially expanded item IDs */
    defaultExpanded?: string[];

    /** Callback when expanded items change */
    onExpandedChange?: (expandedIds: string[]) => void;
}