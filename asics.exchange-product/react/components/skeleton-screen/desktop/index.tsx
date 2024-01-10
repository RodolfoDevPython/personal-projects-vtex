import React from "react"
import ContentLoader from "react-content-loader"

export function PageLoaderDesktop() {
    return (
        <ContentLoader
            speed={2}
            width={900}
            height={500}
            viewBox="0 0 900 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="17" y="35" rx="0" ry="0" width="1000" height="228" />
            <rect x="17" y="292" rx="0" ry="0" width="1000" height="228" />
        </ContentLoader>
    )
}