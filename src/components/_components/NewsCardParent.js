import React from 'react';
import NewsCard from './NewsCard';
import { newsItems } from '@/data/newsItems';

const NewsCardParent = () => {
    return (
        <div className="grid gap-6">
            {newsItems.map((newsItem) => (
                <NewsCard 
                    key={newsItem.id}
                    {...newsItem}
                />
            ))}
        </div>
    );
};

export default NewsCardParent;