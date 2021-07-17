import React, { DetailedHTMLProps, HTMLAttributes, useCallback, useEffect, useState, KeyboardEvent } from "react";
import cn from "classnames";
import StarIcon from "./assets/star.svg";
import styles from "./rating.module.css";

type TProps = {
    isEditable?: boolean;
    rating: number;
    setRating?: (rating: number) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Rating = ({ isEditable, rating, setRating, ...props }: TProps) => {
    const [currentRating, setCurrentRating] = useState(rating);

    useEffect(() => {
        setCurrentRating(rating);
    }, [rating]);

    const handleClick = useCallback(
        (rating: number) => () => {
            if (!isEditable || !setRating) return;
            setRating(rating);
        },
        [isEditable, setRating],
    );

    const handleKeyDown = useCallback(
        (rating: number) => (e: KeyboardEvent<SVGAElement>) => {
            if (e.code !== "Space") return;
            if (!isEditable || !setRating) return;
            setRating(rating);
        },
        [isEditable, setRating],
    );

    const changeDisplay = useCallback(
        (rating: number) => () => {
            if (!isEditable) return;
            setCurrentRating(rating);
        },
        [isEditable, setCurrentRating],
    );

    return (
        <div {...props}>
            {new Array(5).fill(<></>).map((r, i) => (
                <span
                    key={i}
                    className={cn(styles.star, { [styles.filled]: i < currentRating, [styles.editable]: isEditable })}
                    onClick={handleClick(i + 1)}
                    onMouseEnter={changeDisplay(i + 1)}
                    onMouseLeave={changeDisplay(rating)}
                >
                    <StarIcon tabIndex={isEditable ? 0 : -1} onKeyDown={handleKeyDown(i + 1)} />
                </span>
            ))}
        </div>
    );
};
