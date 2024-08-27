import React, { useState } from 'react';

const App = () => {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [result, setResult] = useState("");

    const calculateFn = () => {
        if (!name1.trim() || !name2.trim()) {
            setResult("Please Enter valid input");
            return;
        }


        const chars1 = name1.split('');
        const chars2 = name2.split('');

    
        const countChars1 = {};
        const countChars2 = {};

        chars1.forEach(char => {
            countChars1[char] = (countChars1[char] || 0) + 1;
        });

        chars2.forEach(char => {
            countChars2[char] = (countChars2[char] || 0) + 1;
        });


        Object.keys(countChars1).forEach(char => {
            if (countChars2[char]) {
                const minCount = Math.min(countChars1[char], countChars2[char]);
                countChars1[char] -= minCount;
                countChars2[char] -= minCount;
            }
        });

        const remainingLength = Object.values(countChars1).reduce((acc, count) => acc + count, 0) +
                                Object.values(countChars2).reduce((acc, count) => acc + count, 0);

  
        const flames = ["Siblings", "Friends", "Love", "Affection", "Marriage", "Enemy"];
        const index = remainingLength % 6;
        setResult(flames[index]);
    };

    return (
        <div id='main'>
            <input
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                data-testid="input1"
                placeholder="Enter first name"
            />
            <input
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                data-testid="input2"
                placeholder="Enter second name"
            />
            <button
                data-testid="calculate_relationship"
                onClick={calculateFn}
            >
                Calculate
            </button>
            <button
                onClick={() => {
                    setName1("");
                    setName2("");
                    setResult("");
                }}
                data-testid="clear"
            >
                Clear
            </button>
            {result && <h3 data-testid="answer">{result}</h3>}
        </div>
    );
};

export default App;
