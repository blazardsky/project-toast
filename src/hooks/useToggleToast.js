/** deprecated */

import React from 'react'

const useToggleToast = () => {
    const [showToast, setShowToast] = React.useState(false);

    const toggleToast = () => {
        setShowToast(current => !current)
    }

    return {showToast, toggleToast};
}

export default useToggleToast