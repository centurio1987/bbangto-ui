import type { Meta, StoryObj } from '@storybook/react';
import { MapBlock } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Blocks/MapBlock',
  component: MapBlock,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    address: { control: 'text' },
    embedSrc: { control: 'text' },
  },
} satisfies Meta<typeof MapBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본: 제목 + 주소 + 마커 핀 (지도 API 없이 플레이스홀더) */
export const Default: Story = {
  args: {
    title: '방문하세요',
    address: '서울특별시 강남구 테헤란로 123\n빵또 빌딩 4층',
    markers: [
      { label: '빵또 본점', x: 50, y: 45 },
      { label: '주차장', x: 30, y: 65 },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 제목이 렌더되었는지 확인
    const title = await canvas.findByTestId('map-block-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveTextContent('방문하세요');

    // 2. 주소가 렌더되었는지 확인
    const address = await canvas.findByTestId('map-block-address');
    await expect(address).toBeVisible();

    // 3. 길 찾기 버튼이 존재하고 클릭 가능한지 확인
    const directionsBtn = await canvas.findByTestId('map-block-directions-btn');
    await expect(directionsBtn).toBeVisible();
    await userEvent.click(directionsBtn);

    // 4. 지도 플레이스홀더 영역이 aria role="img" 로 접근 가능한지 확인
    const mapImg = canvasElement.querySelector('[role="img"]');
    await expect(mapImg).not.toBeNull();
  },
};

/** 임베드 지도: embedSrc를 제공하면 iframe이 렌더됩니다 */
export const WithEmbed: Story = {
  args: {
    title: '오시는 길',
    address: '서울특별시 마포구 월드컵북로 396\n누리꿈스퀘어 연구개발타워 9층',
    embedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.3!2d126.9!3d37.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMwJzAwLjAiTiAxMjbCsDU0JzAwLjAiRQ!5e0!3m2!1sko!2skr!4v1600000000000!5m2!1sko!2skr',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 제목 확인
    const title = await canvas.findByTestId('map-block-title');
    await expect(title).toBeVisible();

    // iframe이 렌더되는지 확인 (embedSrc가 있으면 iframe)
    const iframe = canvasElement.querySelector('iframe');
    await expect(iframe).not.toBeNull();
    await expect(iframe?.getAttribute('title')).toBeTruthy();
  },
};
