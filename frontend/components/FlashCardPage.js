import React, {useState} from 'react'

import FlashCardList from './FlashCardList';
import {FLASHCARDS_DATA} from '../asset/FlashCardData';

export default function FlashCardPage() {
    const [flashcards] = useState(FLASHCARDS_DATA);
    return (
        <div className="container-fluid text-center container__margin">
            <div className="container-fluid">
                <h3 className="mont-font">STD (Sexually Transmitted Disease)</h3>
                <p>STDs are infections that are spread from one person to another, usually during vaginal, anal, and oral sex. They’re really common, and lots of people who have them don’t have any symptoms. Without treatment, STDs can lead to serious health problems. But the good news is that getting tested is no big deal, and most STDs are easy to treat.</p>
            </div>
            <div className="container-fluid text-center bg-2 container__margin">
                <h4 className="text-white mont-font">Flip the cards to learn more about common STDs</h4>
                <FlashCardList flashcards={flashcards} />
            </div>
            
        </div>
    )
}