import React from 'react';

import Image from 'next/image';
import downArrow from '../../public/deliverables/web_application/top_ribbon/arrow_down.svg';
import upArrow from '../../public/deliverables/web_application/top_ribbon/arrow_up.svg';
import neutralArrow from '../../public/deliverables/web_application/top_ribbon/neutral.svg';

/*
Properties:

- tickers: TickerItem[] - Array of ticker items to display.
- width?: string - The width of each ticker item.
- height?: string - The height of each ticker item.
- bgColor?: string - The background color of the ticker container.
- nameColor?: string - The color of the ticker name.
- priceColor?: string - The color of the price (overridden by direction colors).
- fontSize?: string - The font size of the text.
- nameWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | number - The weight of the name text.
- priceWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | number - The weight of the price text.
- borderRadius?: string - The border radius of ticker items.
- border?: string - The border style of ticker items.
- padding?: string - The padding inside ticker items.
- margin?: string - The margin outside ticker items.
- gap?: string - The gap between ticker items.
- upColor?: string - The color for up direction.
- downColor?: string - The color for down direction.
- neutralColor?: string - The color for neutral direction.
- upIcon?: React.ReactNode - Custom icon for up direction.
- downIcon?: React.ReactNode - Custom icon for down direction.
- neutralIcon?: React.ReactNode - Custom icon for neutral direction.
- showIcons?: boolean - Whether to show direction icons.
- onClick?: (ticker: TickerItem) => void - Click event handler for ticker items.
- className?: string - Additional CSS classes.
- style?: React.CSSProperties - Additional inline styles.

*/

export interface TickerItem {
    name: string;
    direction: 'up' | 'down' | 'neutral';
    price: number;
}

interface MarketTickerProps {
    tickers: TickerItem[];

    // appearance
    width?: string;
    height?: string;
    bgColor?: string;
    nameColor?: string;
    priceColor?: string;
    fontSize?: string;
    nameWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | number;
    priceWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | number;

    // bpm
    borderRadius?: string;
    border?: string;
    padding?: string;
    margin?: string;
    gap?: string;

    // direction colors
    upColor?: string;
    downColor?: string;
    neutralColor?: string;

    // icons
    upIcon?: React.ReactNode;
    downIcon?: React.ReactNode;
    neutralIcon?: React.ReactNode;
    showIcons?: boolean;

    // functionality
    onClick?: (ticker: TickerItem) => void;

    // additional styling
    className?: string;
    style?: React.CSSProperties;
}

const MarketTicker: React.FC<MarketTickerProps> = ({
    tickers,
    width = '129px',
    height = '25px',
    bgColor = 'transparent',
    nameColor = '#000000',
    priceColor,
    fontSize = '12px',
    nameWeight = 'medium',
    priceWeight = 'bold',
    borderRadius = '0px',
    border = 'none',
    padding = '0px',
    margin = '0',
    gap = '0px',
    upColor = '#0C8544',
    downColor = '#ED0A4F',
    neutralColor = '#6B7280',
    upIcon,
    downIcon,
    neutralIcon,
    showIcons = true,
    onClick,
    className = '',
    style,
}) => {
    // Font weight mapping
    const getFontWeight = (weight: 'normal' | 'medium' | 'semibold' | 'bold' | number) => {
        if (typeof weight === 'number') return weight;
        const weights = {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        };
        return weights[weight];
    };

    // Get color based on direction
    const getDirectionColor = (direction: 'up' | 'down' | 'neutral') => {
        switch (direction) {
            case 'up':
                return upColor;
            case 'down':
                return downColor;
            case 'neutral':
                return neutralColor;
        }
    };

    // get icon
    const getDirectionIcon = (direction: 'up' | 'down' | 'neutral') => {
        if (!showIcons) return null;

        if (direction === 'up' && upIcon) return upIcon;
        if (direction === 'down' && downIcon) return downIcon;
        if (direction === 'neutral' && neutralIcon) return neutralIcon;

        // Default icons
        if (direction === 'up') return <Image src={upArrow} alt="up" width={12} height={12} />;
        if (direction === 'down') return <Image src={downArrow} alt="down" width={12} height={12} />;
        return <Image src={neutralArrow} alt="up" width={12} height={12} />;
    };

    //format price 
    const formatPrice = (price: number) => {
        return Math.abs(price).toFixed(2);
    };

    //truncate name if too long
    const truncateName = (name: string) => {
        return name.length > 8 ? name.substring(0, 8) + '...' : name;
    };

    const containerStyles: React.CSSProperties = {
        display: 'flex',
        gap,
        alignItems: 'center',
        flexWrap: 'wrap',
        ...style,
    };

    const tickerItemStyles = (ticker: TickerItem): React.CSSProperties => ({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width,
        height,
        backgroundColor: bgColor,
        borderRadius,
        border,
        padding,
        margin,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
    });

    const nameStyles: React.CSSProperties = {
        color: nameColor,
        fontSize,
        fontWeight: getFontWeight(nameWeight),
    };

    const priceStyles = (direction: 'up' | 'down' | 'neutral'): React.CSSProperties => ({
        color: priceColor || getDirectionColor(direction),
        fontSize,
        fontWeight: getFontWeight(priceWeight),
    });

    return (
        <div className={className} style={containerStyles}>
            {tickers.map((ticker, index) => (
                <div
                    key={`${ticker.name}-${index}`}
                    style={tickerItemStyles(ticker)}
                    onClick={() => onClick?.(ticker)}
                >
                    <span style={nameStyles}>{truncateName(ticker.name)}</span>
                    {getDirectionIcon(ticker.direction)}
                    <span style={priceStyles(ticker.direction)}>
                        {formatPrice(ticker.price)}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default MarketTicker;
