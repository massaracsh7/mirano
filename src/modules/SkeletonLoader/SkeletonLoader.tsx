import React from 'react';
import ContentLoader from 'react-content-loader';
import style from './SkeletonLoader.module.scss';

interface SkeletonLoaderProps {
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className={style.skeletonwrapper}>
        <ContentLoader
          speed={2}
          viewBox="0 0 420 600"
          backgroundColor="#d17d2f"
          foregroundColor="#607900"
        >
          <rect x="0" y="0" width="100%" height="70%" />
          <rect x="24" y="calc(70% + 30px)" width="60%" height="30%" />
          <rect x="24" y="calc(70% + 80px)" width="40%" height="25px" />
        </ContentLoader>
      </div>
    ))}
  </>
);
