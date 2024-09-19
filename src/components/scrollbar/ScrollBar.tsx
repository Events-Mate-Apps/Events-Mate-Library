import React, { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface ScrollbarProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
}

export const renderTrack: FC<ScrollbarProps> = ({ style, ...props }) => {
  const trackStyle: React.CSSProperties = {
    position: 'absolute',
    maxWidth: '100%',
    width: 6,
    transition: 'opacity 200ms ease 0s',
    opacity: 0,
    background: 'transparent',
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};

export const renderThumb: FC<ScrollbarProps> = ({ style, ...props }) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: 'rgba(222, 222, 222, .1)',
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const renderView: FC<ScrollbarProps> = ({ style, ...props }) => {
  const viewStyle: React.CSSProperties = {
    marginBottom: -22,
  };
  return (
    <Box
      me={{ base: '0px !important' }}
      style={{ ...style, ...viewStyle }}
      {...(props as BoxProps)}
    />
  );
};

export const kanbanRenderTrack: FC<ScrollbarProps> = ({ style, ...props }) => {
  const trackStyle: React.CSSProperties = {
    width: 6,
    transition: 'opacity 200ms ease 0s',
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};

export const kanbanRenderThumb: FC<ScrollbarProps> = ({ style, ...props }) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: 'rgba(222, 222, 222, .1)',
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const kanbanRenderView: FC<ScrollbarProps> = ({ style, ...props }) => {
  const viewStyle: React.CSSProperties = {
    position: 'relative',
    marginRight: -15,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};

export const storiesRenderTrack: FC<ScrollbarProps> = ({ style, ...props }) => {
  const trackStyle: React.CSSProperties = {
    width: 6,
    transition: 'opacity 200ms ease 0s',
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};

export const storiesRenderThumb: FC<ScrollbarProps> = ({ style, ...props }) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: 'rgba(222, 222, 222, .1)',
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const storiesRenderView: FC<ScrollbarProps> = ({ style, ...props }) => {
  const viewStyle: React.CSSProperties = {
    position: 'relative',
    marginRight: -15,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};

export const messagesRenderTrack: FC<ScrollbarProps> = ({ style, ...props }) => {
  const trackStyle: React.CSSProperties = {
    position: 'absolute',
    maxWidth: '100%',
    width: 6,
    transition: 'opacity 200ms ease 0s',
    opacity: 0,
    background: 'transparent',
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};

export const messagesRenderThumb: FC<ScrollbarProps> = ({ style, ...props }) => {
  const thumbStyle: React.CSSProperties = {
    borderRadius: 15,
    background: 'rgba(222, 222, 222, .1)',
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const messagesRenderView: FC<ScrollbarProps> = ({ style, ...props }) => {
  const viewStyle: React.CSSProperties = {
    marginBottom: -22,
    maxWidth: '100%',
  };
  return <Box style={{ ...style, ...viewStyle }} {...(props as BoxProps)} />;
};