import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './styled';

interface postProps {
  post: string;
}

const ParseHtml: React.FC<postProps> = ({ post }) => (
  <S.Post dangerouslySetInnerHTML={{ __html: post }} />
);

export const RandomPost = () => {
  const [post, setPost] = useState('');
  const params = useParams();
  const id = Number(params.id);
  const getPost = async () => {
    await axios
      .get(`/api/post/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzLCJlbWFpbCI6IjEwMDR3aXBpQGdtYWlsLmNvbSIsInN0YXR1cyI6MCwiaWF0IjoxNjcyMTI4NDI2LCJleHAiOjE2NzIyMTEyMjZ9.P9MfYDCnIkYs767h-Fjt3QB4hTHycXbtzwYosfJZEgw`,
        },
      })
      .then((res: any) => {
        console.log(res);
        const { content } = res.data.post;
        setPost(content);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPost();
  }, []);
  return <ParseHtml post={post} />;
};
