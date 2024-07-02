import React from 'react';
import Background from '../components/background.tsx'
function SettingsPage() {
    return (
        <div>
            <Background className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Settings
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                        Customize your App
                    </p>
                </header>
            </Background>
        </div>
    )
}

export default SettingsPage
