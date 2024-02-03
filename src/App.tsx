import React, { FC, useState } from 'react';
import "./index.css";

type ListItemsProps = {
    type: string
    url?: string
    title?: string
    views: number
    children?: React.ReactNode; 
}
type ListProps = {
    list: ListItemsProps[]
}


function New(props: ListItemsProps) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props: ListItemsProps) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function Article(props: ListItemsProps) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props: ListItemsProps) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};
/**
 * Принимает три компонента и возвращает компонент высшего порядка, который рендерит либо PopularComponent, 
 * либо NewComponent, исходя из значения свойства views.
 *
 * @param {FC<ListItemsProps>} WrapperComponent - компонент-обертка
 * @param {FC<ListItemsProps>} NewComponent - новый компонент
 * @param {FC<ListItemsProps>} PopularComponent - популярный компонент
 * @return {(props: ListItemsProps) => JSX.Element} компонент высшего порядка
 */
const withList = (WrapperComponent: FC<ListItemsProps>, NewComponent: FC<ListItemsProps>, PopularComponent: FC<ListItemsProps>) => {
    return (props: ListItemsProps) => {
        const { views } = props;
        if(views > 1000) {
            return <PopularComponent {...props} />
        } else {
            return <NewComponent {...props} />
        }
    }
}

const VideoWithList = withList(Video, New, Popular);
const ArticleWithList = withList(Article, New, Popular);


function List(props: ListProps) {
    console.info(props);
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <VideoWithList {...item} />
                );

            case 'article':
                return (
                    <ArticleWithList {...item} />
                );
        }
    });
};


export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}
