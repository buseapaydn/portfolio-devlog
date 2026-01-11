import React from 'react';

type SkillCardProps = {
    title: string;
    description: string;
    tags: string[];
};

export default function SkillCard({ title, description, tags }: SkillCardProps) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="tags">
                {tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>
        </div>
    );
}
