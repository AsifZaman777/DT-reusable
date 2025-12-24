
"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "./button";

export interface DropdownItem {
    value?: string | number;
    label?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    payload?: any;
}

interface DropdownProps {
    // trigger
    icon?: React.ReactNode;
    label?: string;
    // items (generic arbitrary objects)
    items: any[];
    onSelect?: (item: any) => void;
    renderItem?: (item: any) => React.ReactNode;

    // visual props (matching Button-like API)
    bgColor?: string;
    textColor?: string;
    fontSize?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    border?: string;
    padding?: string;
    hoverBgColor?: string;
    hoverTextColor?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    alignment?: 'left' | 'center' | 'right';

    // menu styling
    menuAlign?: 'left' | 'right';
    itemPadding?: string;
    itemTextColor?: string;
    itemHoverBg?: string; // hover background color
    itemBg?: string; // item background color
    itemBgKey?: string; // per-item background property name
    // dynamic mapping
    itemKey?: string; // property name to use as key/id
    itemLabel?: string; // property name to use as label
    itemDisabledKey?: string; // property name for disabled flag on items

    // states
    loading?: boolean;
    error?: string | boolean;
    disabled?: boolean; // disable the trigger
    // render without the trigger button
    noButton?: boolean;
    // controlled open state
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;

    // misc
    className?: string;
    style?: React.CSSProperties;
    buttonProps?: any;
    // toggle indicator
    showToggle?: boolean;
    toggleIcon?: React.ReactNode;
    togglePosition?: 'right' | 'left';
}

const Dropdown: React.FC<DropdownProps> = ({
    icon,
    label,
    items,
    onSelect,
    renderItem,
    // visual defaults
    bgColor = '#3b82f6',
    textColor = '#000000',
    fontSize,
    width = '120px',
    height = '28px',
    borderRadius = '6px',
    border = 'none',
    padding,
    hoverBgColor,
    hoverTextColor,
    size = 'md',
    variant = 'primary',
    // button text alignment (passed to Button). Default right.
    alignment = 'left',
    // menu
    menuAlign = 'right',
    itemPadding = '8px 12px',
    itemTextColor = '#111827',
    itemHoverBg = '#f3f4f6',
    itemBg = 'transparent',
    itemBgKey = 'bg',
    // mapping defaults
    itemKey = 'value',
    itemLabel = 'label',
    itemDisabledKey = 'disabled',

    // states
    loading = false,
    error = false,
    disabled = false,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    // toggle
    showToggle = true,
    toggleIcon,
    togglePosition = 'right',
    className = '',
    style,
    buttonProps,
}) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(!!defaultOpen);
    const isControlled = typeof openProp === 'boolean';
    const open = isControlled ? !!openProp : internalOpen;
    const ref = useRef<HTMLDivElement | null>(null);
    const triggerWrapperRef = useRef<HTMLDivElement | null>(null);
    const [menuWidth, setMenuWidth] = useState<string | undefined>(undefined);
    const firstItemRef = useRef<HTMLButtonElement | null>(null);

    const setOpenState = (v: boolean) => {
        if (isControlled) {
            onOpenChange?.(v);
        } else {
            setInternalOpen(v);
            onOpenChange?.(v);
        }
    };

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpenState(false);
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    useEffect(() => {
        if (open) {
            // focus first item for keyboard accessibility
            setTimeout(() => firstItemRef.current?.focus(), 0);
        }
    }, [open]);

    // set menu width to trigger width or provided width prop
    const formatWidth = (w?: string | number) => {
        if (w == null) return undefined;
        return typeof w === 'number' ? `${w}px` : w;
    };

    useLayoutEffect(() => {
        if (width != null) {
            setMenuWidth(formatWidth(width));
            return;
        }
        const update = () => {
            const w = triggerWrapperRef.current?.offsetWidth;
            setMenuWidth(w ? `${w}px` : undefined);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [width]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") setOpenState(false);
        if (e.key === "ArrowDown") setOpenState(true);
    };

    const handleSelect = (item: any) => {
        const isDisabled = !!(item?.disabled ?? item?.[itemDisabledKey]);
        if (isDisabled) return;
        // pass original/raw item when available, otherwise pass normalized
        const raw = item?.raw ?? item;
        onSelect?.(raw);
        setOpenState(false);
    };

    // map raw items (which may be arbitrary objects) to a normalized view
    const normalizeItem = (raw: any) => {
        const key = raw?.[itemKey] ?? raw?.id ?? raw;
        const label = raw?.[itemLabel] ?? raw?.label ?? String(raw);
        const isDisabled = !!raw?.[itemDisabledKey];
        const bg = raw?.[itemBgKey] ?? itemBg;
        return { raw, key, value: key, label, disabled: isDisabled, bg } as DropdownItem & { raw: any; key: any; bg?: string };
    };

    const normalized = Array.isArray(items) ? items.map(normalizeItem) : [];

    const defaultTriggerWidth = '120px';

    const defaultToggle = (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const toggleNode = (
        <span style={{ display: 'inline-flex', alignItems: 'center', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transformOrigin: 'center', transition: 'transform 0.18s' }}>
            {toggleIcon ?? defaultToggle}
        </span>
    );

    const triggerButtonProps = {
        icon,
        text: label || '',
        // if togglePosition is left and showToggle, render toggle as icon on left
        iconPosition: icon ? 'left' : (togglePosition === 'left' && showToggle ? 'left' : 'right'),
        alignment,
        bgColor,
        textColor,
        fontSize,
        width: formatWidth(width) || defaultTriggerWidth,
        height,
        borderRadius,
        border,
        padding,
        hoverBgColor,
        hoverTextColor,
        size,
        variant,
        onClick: () => setOpenState(!open),
        disabled: disabled || buttonProps?.disabled,
        ...buttonProps,
        // place toggle inside the button: left (as icon) or right (as trailing)
        ...(togglePosition === 'left' && showToggle ? { icon: toggleNode } : {}),
        ...(togglePosition === 'right' && showToggle ? { trailing: toggleNode } : {}),
    };

    return (
        <div ref={ref} className={`dropdown-root ${className}`} style={{ position: 'relative', display: 'inline-block', ...style }}>
            <div ref={triggerWrapperRef} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Button {...triggerButtonProps} />
            </div>
            <div
                role="menu"
                aria-hidden={!open}
                onKeyDown={handleKeyDown}
                style={{
                    display: open ? 'block' : 'none',
                    position: 'absolute',
                    width: menuWidth ?? 'auto',
                    [menuAlign === 'right' ? 'right' : 'left']: 0,
                    marginTop: '6px',
                    background: itemBg,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                    borderRadius: '6px',
                    zIndex: 40,
                    padding: '6px 0',
                }}
            >
                {loading ? (
                    <div style={{ padding: '12px', textAlign: 'center', color: '#6b7280' }}>Loading...</div>
                ) : error ? (
                    <div style={{ padding: '12px', textAlign: 'center', color: '#ef4444' }}>{typeof error === 'string' ? error : 'Error'}</div>
                ) : normalized.length === 0 ? (
                    <div style={{ padding: '12px', textAlign: 'center', color: '#6b7280' }}>No items</div>
                ) : (
                    normalized.map((nit, idx) => {
                        const isFirst = idx === 0;
                        const isLast = idx === normalized.length - 1;
                        return (
                            <button
                                key={nit.key}
                                ref={isFirst ? firstItemRef : undefined}
                                role="menuitem"
                                disabled={nit.disabled}
                                onClick={() => handleSelect(nit)}
                                onMouseEnter={(e) => { if (!nit.disabled) (e.currentTarget as HTMLButtonElement).style.background = itemHoverBg || '#f3f4f6'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = nit.bg ?? itemBg; }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    width: '100%',
                                    background: nit.bg ?? itemBg,
                                    border: 'none',
                                    padding: itemPadding,
                                    textAlign: 'left',
                                    cursor: nit.disabled ? 'not-allowed' : 'pointer',
                                    color: nit.disabled ? '#9ca3af' : itemTextColor,
                                    borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.06)'
                                }}
                            >
                                {nit.raw?.icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{nit.raw.icon}</span>}
                                <span style={{ flex: 1 }}>{renderItem ? renderItem(nit.raw) : nit.label}</span>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Dropdown;


