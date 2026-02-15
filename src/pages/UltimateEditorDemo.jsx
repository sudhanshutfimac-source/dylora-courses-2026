import React from 'react';
import { Link } from 'react-router-dom';
import LiveCodeEditorUltimate from '../components/LiveCodeEditorUltimate';

const UltimateEditorDemo = () => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-body)' }}>
            <LiveCodeEditorUltimate />
        </div>
    );
};

export default UltimateEditorDemo;
