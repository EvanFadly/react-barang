import { Routes, Route } from 'react-router-dom';

import Home from '../views/home';
import PostsIndex from '../views/posts/index';
import PostsCreate from '../views/posts/create';
import PostsEdit from '../views/posts/edit';

function RoutesIndex() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostsIndex />} />
            <Route path="/posts/create" element={<PostsCreate />} />
            <Route path="/posts/edit/:id" element={<PostsEdit />} />
        </Routes>
    )
}

export {RoutesIndex as Routes};