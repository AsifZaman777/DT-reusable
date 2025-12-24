
import React, { useEffect } from 'react';

/*
Properties:

- primaryText: string - The main text to display (e.g., "Time and sales").
- secondaryText: string - The secondary text to display (e.g., "F2").
- primaryTextWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | number - The weight of the primary text.
- primaryTextColor?: string - The color of the primary text.
- primaryFontSize?: string - The font size of the primary text.
- secondaryTextWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | number - The weight of the secondary text.
- secondaryTextColor?: string - The color of the secondary text.
- secondaryFontSize?: string - The font size of the secondary text.
- bgColor?: string - The background color of the hotkey.
- width?: string - The width of the hotkey.
- height?: string - The height of the hotkey.
- borderRadius?: string - The border radius of the hotkey.
- border?: string - The border style of the hotkey.
- padding?: string - The padding inside the hotkey.
- margin?: string - The margin outside the hotkey.
- onClick?: () => void - The click event handler for the hotkey.
- disabled?: boolean - Whether the hotkey is disabled.
- keys?: string[] - Array of keys for keyboard shortcut (e.g., ['Ctrl', 'Shift', 'D'] or ['F2']).
- hoverBgColor?: string - The background color on hover.
- hoverPrimaryTextColor?: string - The primary text color on hover.
- hoverSecondaryTextColor?: string - The secondary text color on hover.
- icon?: React.ReactNode - An optional icon to display in the hotkey.
- variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' - The visual variant of the hotkey.
- size?: 'sm' | 'md' | 'lg' - The size of the hotkey.
- className?: string - Additional CSS classes for the hotkey.
- style?: React.CSSProperties - Additional inline styles for the hotkey.

*/

interface HotKeyProps {
    // text props
    primaryText: string;
    secondaryText: string;
    primaryTextWeight?: 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | number;
    primaryTextColor?: string;
    primaryFontSize?: string;
    secondaryTextWeight?: 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | number;
    secondaryTextColor?: string;
    secondaryFontSize?: string;

    // appearance
    bgColor?: string;
    width?: string;
    height?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

    // bpm
    borderRadius?: string;
    border?: string;
    padding?: string;
    margin?: string;

    // functionality
    onClick?: () => void;
    disabled?: boolean;
    keys?: string[];

    // hover effects
    hoverBgColor?: string;
    hoverPrimaryTextColor?: string;
    hoverSecondaryTextColor?: string;

    // icons
    icon?: React.ReactNode;

    // additional styling
    className?: string;
    style?: React.CSSProperties;
}

const HotKey: React.FC<HotKeyProps> = ({
    primaryText,
    secondaryText,
    primaryTextWeight = 'medium',
    primaryTextColor = 'black',
    primaryFontSize = '12px',
    secondaryTextWeight = 'thin',
    secondaryTextColor = 'black',
    secondaryFontSize = '12px',
    bgColor = '#3b82f6',
    width = '255px',
    height = '36px',
    borderRadius = '0px',
    border = 'none',
    padding,
    margin = '0',
    onClick,
    disabled = false,
    keys,
    hoverBgColor,
    hoverPrimaryTextColor,
    hoverSecondaryTextColor,
    className = '',
    style,
    icon,
    variant = 'default',
    size = 'md',
}) => {
    // Size presets
    const sizeStyles = {
        sm: { padding: '6px 12px', fontSize: '14px' },
        md: { padding: '10px 20px', fontSize: '16px' },
        lg: { padding: '14px 28px', fontSize: '18px' },
    };

    // Variant presets
    const variantStyles = {
        default: { bgColor: '#DBEBFF', textColor: 'black', border: 'none' },
        primary: { bgColor: '#3b82f6', textColor: '#ffffff', border: 'none' },
        secondary: { bgColor: '#6b7280', textColor: '#ffffff', border: 'none' },
        outline: { bgColor: 'transparent', textColor: '#3b82f6', border: '2px solid #3b82f6' },
        ghost: { bgColor: 'transparent', textColor: '#3b82f6', border: 'none' },
        danger: { bgColor: '#ED0A4F', textColor: '#ffffff', border: 'none' },
    };

    // Apply variant styles if not overridden
    const variantStyle = variantStyles[variant];
    const finalBgColor = bgColor === '#3b82f6' && variant !== 'primary' ? variantStyle.bgColor : bgColor;
    const finalPrimaryTextColor = primaryTextColor === '#ffffff' && variant !== 'primary' ? variantStyle.textColor : primaryTextColor;
    const finalSecondaryTextColor = secondaryTextColor === '#ffffff' && variant !== 'primary' ? variantStyle.textColor : secondaryTextColor;
    const finalBorder = border === 'none' && variant === 'outline' ? variantStyle.border : border;

    // Apply size styles if padding/fontSize not provided
    const sizeStyle = sizeStyles[size];
    const finalPadding = padding || sizeStyle.padding;
    const finalPrimaryFontSize = primaryFontSize || sizeStyle.fontSize;
    const finalSecondaryFontSize = secondaryFontSize || sizeStyle.fontSize;

    // Font weight mapping
    const getFontWeight = (weight: 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | number) => {
        if (typeof weight === 'number') return weight;
        const weights = {
            thin: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        };
        return weights[weight];
    };

    const hotKeyStyles: React.CSSProperties = {
        backgroundColor: finalBgColor,
        width,
        height,
        borderRadius,
        border: finalBorder,
        padding: finalPadding,
        margin,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: icon ? '8px' : '0',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.3s ease',
        outline: 'none',
        ...style,
    };

    const primaryTextStyles: React.CSSProperties = {
        color: finalPrimaryTextColor,
        fontWeight: getFontWeight(primaryTextWeight),
        fontSize: finalPrimaryFontSize,
        transition: 'color 0.3s ease',
    };

    const secondaryTextStyles: React.CSSProperties = {
        color: finalSecondaryTextColor,
        fontWeight: getFontWeight(secondaryTextWeight),
        fontSize: finalSecondaryFontSize,
        marginLeft: 'auto',
        transition: 'color 0.3s ease',
    };

    // Keyboard shortcut handler
    useEffect(() => {
        if (!onClick || disabled || !keys || keys.length === 0) return;

        const handleKeyPress = (e: KeyboardEvent) => {
            // Normalize keys to lowercase for comparison
            const normalizedKeys = keys.map(k => k.toLowerCase().trim());

            // Check for modifier keys
            const hasCtrl = normalizedKeys.includes('ctrl') || normalizedKeys.includes('control');
            const hasAlt = normalizedKeys.includes('alt');
            const hasShift = normalizedKeys.includes('shift');
            const hasMeta = normalizedKeys.includes('meta') || normalizedKeys.includes('cmd') || normalizedKeys.includes('win');

            // Get the main key (non-modifier)
            const mainKey = normalizedKeys.find(k =>
                !['ctrl', 'control', 'alt', 'shift', 'meta', 'cmd', 'win'].includes(k)
            );

            // Check if pressed modifiers match
            const modifiersMatch =
                e.ctrlKey === hasCtrl &&
                e.altKey === hasAlt &&
                e.shiftKey === hasShift &&
                e.metaKey === hasMeta;

            // Check if main key matches
            let keyMatches = false;
            if (mainKey) {
                keyMatches =
                    e.key.toLowerCase() === mainKey ||
                    e.code.toLowerCase() === mainKey ||
                    e.code.toLowerCase() === `key${mainKey}` ||
                    (mainKey.startsWith('f') && e.key.toLowerCase() === mainKey); // Function keys
            } else {
                // If only modifiers are specified, match on those
                keyMatches = true;
            }

            if (modifiersMatch && keyMatches) {
                e.preventDefault();
                onClick();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [keys, onClick, disabled]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled && hoverBgColor) {
            e.currentTarget.style.backgroundColor = hoverBgColor;
        }
        if (!disabled && hoverPrimaryTextColor) {
            const primaryTextElement = e.currentTarget.querySelector('.primary-text') as HTMLElement;
            if (primaryTextElement) {
                primaryTextElement.style.color = hoverPrimaryTextColor;
            }
        }
        if (!disabled && hoverSecondaryTextColor) {
            const secondaryTextElement = e.currentTarget.querySelector('.secondary-text') as HTMLElement;
            if (secondaryTextElement) {
                secondaryTextElement.style.color = hoverSecondaryTextColor;
            }
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled) {
            e.currentTarget.style.backgroundColor = finalBgColor;
            const primaryTextElement = e.currentTarget.querySelector('.primary-text') as HTMLElement;
            if (primaryTextElement) {
                primaryTextElement.style.color = finalPrimaryTextColor;
            }
            const secondaryTextElement = e.currentTarget.querySelector('.secondary-text') as HTMLElement;
            if (secondaryTextElement) {
                secondaryTextElement.style.color = finalSecondaryTextColor;
            }
        }
    };

    return (
        <div
            onClick={disabled ? undefined : onClick}
            className={className}
            style={hotKeyStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
            <span className="primary-text" style={primaryTextStyles}>{primaryText}</span>
            <span className="secondary-text" style={secondaryTextStyles}>{secondaryText}</span>
        </div>
    );
};

export default HotKey;
