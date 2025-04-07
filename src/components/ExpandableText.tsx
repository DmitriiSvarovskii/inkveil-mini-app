import React, { useState } from 'react';
import '../styles/styles.css'; // убедитесь, что путь корректный

interface ExpandableTextProps {
    text: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(prev => !prev);

    return (
        <div
            className={`expandable-text clickable ${expanded ? 'expanded' : 'collapsed'}`}
            onClick={toggleExpanded}
        >
            {text}
        </div>
    );
};

export default ExpandableText;