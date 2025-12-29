
import React from 'react';

/*
Properties:

- text: string - The text to display on the button.
- textWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | number - The weight of the button text.
- textColor?: string - The color of the button text.
- fontSize?: string - The font size of the button text.
- alignment?: 'left' | 'center' | 'right' - The alignment of the button content.
- bgColor?: string - The background color of the button.
- width?: string - The width of the button.
- height?: string - The height of the button.
- borderRadius?: string - The border radius of the button.
- border?: string - The border style of the button.
- padding?: string - The padding inside the button.
- margin?: string - The margin outside the button.
- onClick?: () => void - The click event handler for the button.
- disabled?: boolean - Whether the button is disabled.
- type?: 'button' | 'submit' | 'reset' - The type of the button.
- hoverBgColor?: string - The background color on hover.
- hoverTextColor?: string - The text color on hover.
- icon?: React.ReactNode - An optional icon to display in the button.
- iconPosition?: 'left' | 'right' - The position of the icon relative to the text.
- variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' - The visual variant of the button.
- size?: 'sm' | 'md' | 'lg' - The size of the button.

- className?: string - Additional CSS classes for the button.
- style?: React.CSSProperties - Additional inline styles for the button.

*/

interface ButtonProps {
    //text props
    text?: string;
    textWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | number;
    textColor?: string;
    fontSize?: string;
    alignment?: 'left' | 'center' | 'right';

    //appearance
    bgColor?: string;
    width?: string;
    height?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

    //bpm
    borderRadius?: string;
    border?: string;
    padding?: string;
    margin?: string;

    // functionality
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';

    //hover effects
    hoverBgColor?: string;
    hoverTextColor?: string;

    // icons
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    // trailing node to render after text (e.g. caret)
    trailing?: React.ReactNode;


    // additional styling
    className?: string;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
    text,
    textWeight = 'medium',
    textColor = '#ffffff',
    fontSize,
    bgColor = '#3b82f6',
    width = '88px',
    height = '24px',
    alignment = 'center',
    borderRadius = '5px',
    border = 'none',
    padding,
    margin = '0',
    onClick,
    disabled = false,
    type = 'button',
    hoverBgColor,
    hoverTextColor,
    className = '',
    style,
    icon,
    iconPosition = 'left',
    variant = 'primary',
    size = 'md',
    trailing,
}) => {
    // Size presets
    const sizeStyles = {
        sm: { padding: '6px 12px', fontSize: '14px' },
        md: { padding: '10px 20px', fontSize: '16px' },
        lg: { padding: '14px 28px', fontSize: '18px' },
    };

    // Variant presets
    const variantStyles = {
        primary: { bgColor: '#3b82f6', textColor: '#ffffff', border: 'none' },
        secondary: { bgColor: '#6b7280', textColor: '#ffffff', border: 'none' },
        outline: { bgColor: 'transparent', textColor: '#3b82f6', border: '2px solid #3b82f6' },
        ghost: { bgColor: 'transparent', textColor: '#3b82f6', border: 'none' },
        danger: { bgColor: '#ED0A4F', textColor: '#ffffff', border: 'none' },
    };

    // Apply variant styles if not overridden
    const variantStyle = variantStyles[variant];
    const finalBgColor = bgColor === '#3b82f6' && variant !== 'primary' ? variantStyle.bgColor : bgColor;
    const finalTextColor = textColor === '#ffffff' && variant !== 'primary' ? variantStyle.textColor : textColor;
    const finalBorder = border === 'none' && variant === 'outline' ? variantStyle.border : border;

    // Apply size styles if padding/fontSize not provided
    const sizeStyle = sizeStyles[size];
    const finalPadding = padding || sizeStyle.padding;
    const finalFontSize = fontSize || sizeStyle.fontSize;

    // Font weight mapping
    const getFontWeight = () => {
        if (typeof textWeight === 'number') return textWeight;
        const weights = {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        };
        return weights[textWeight];
    };

    // Alignment styles
    const alignmentStyles = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
    };

    const buttonStyles: React.CSSProperties = {
        backgroundColor: finalBgColor,
        color: finalTextColor,
        width,
        height,
        fontWeight: getFontWeight(),
        fontSize: finalFontSize,
        borderRadius,
        border: finalBorder,
        padding: finalPadding,
        margin,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: alignmentStyles[alignment],
        gap: (icon || trailing) ? '8px' : '0',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.3s ease',
        outline: 'none',
        ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && hoverBgColor) {
            e.currentTarget.style.backgroundColor = hoverBgColor;
        }
        if (!disabled && hoverTextColor) {
            e.currentTarget.style.color = hoverTextColor;
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
            e.currentTarget.style.backgroundColor = finalBgColor;
            e.currentTarget.style.color = finalTextColor;
        }
    };

    return (
        <button
            type={type}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={className}
            style={buttonStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {icon && iconPosition === 'left' && <span>{icon}</span>}
            <span>{text}</span>
            {icon && iconPosition === 'right' && <span>{icon}</span>}
            {trailing && <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 8 }}>{trailing}</span>}
        </button>
    );
};

export default Button;