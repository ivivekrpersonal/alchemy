import styled from 'styled-components';

export const ToolTipWrapper = styled.div`
  display: inline-block;
  position: relative;
`
export const ToolTipContent = styled.div`
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px;
  color: rgb(0, 0, 0);
  background: rgb(218, 218, 218);
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1;
  z-index: 100;
  white-space: nowrap;
  bottom: calc(10px * -1);
  &:before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 1px;
    margin-left: calc(5px * -1);
  }
`
