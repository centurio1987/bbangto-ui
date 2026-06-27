import type { Meta, StoryObj } from '@storybook/react';
import { MapBlock } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const collectStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');

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

/** split 레이아웃: 지도 옆 정보 패널, >=lg에서 2열 (scoped style) */
export const LayoutSplit: Story = {
  parameters: { viewport: { defaultViewport: 'desktop' } },
  args: {
    layout: 'split',
    title: '오시는 길',
    address: '서울특별시 강남구 테헤란로 123',
    infoPanel: <p data-testid="split-info">영업시간 09:00 - 21:00</p>,
    markers: [{ label: '빵또 본점', x: 50, y: 45 }],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const section = canvasElement.querySelector('[data-block="map-block"]');
    await expect(section).not.toBeNull();
    await expect(section?.getAttribute('data-bbangto-mapblock-layout')).toBe('split');

    // 2. load-bearing: scoped >=lg 2열 규칙이 style 태그에 존재
    const styles = collectStyles(canvasElement);
    await expect(styles).toMatch(/\.bbangto-mapblock-split\s*\{[^}]*grid-template-columns/);
    await expect(styles).toMatch(/min-width:\s*\d+px/);

    // 3. 정보 패널 + 지도 영역 렌더 확인
    const panel = await canvas.findByTestId('map-block-info-panel');
    await expect(panel).toBeVisible();
    await expect(await canvas.findByTestId('split-info')).toBeVisible();
    const mapImg = canvasElement.querySelector('[role="img"]');
    await expect(mapImg).not.toBeNull();
  },
};

/** card 레이아웃: 테두리 + 라운드 + 그림자가 적용된 지도 카드 */
export const LayoutCard: Story = {
  args: {
    layout: 'card',
    title: '매장 위치',
    address: '서울특별시 송파구 올림픽로 300',
    markers: [{ label: '빵또 잠실점', x: 55, y: 50 }],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const section = canvasElement.querySelector('[data-block="map-block"]');
    await expect(section).not.toBeNull();
    await expect(section?.getAttribute('data-bbangto-mapblock-layout')).toBe('card');

    // 2. load-bearing: 지도 영역에 solid border + borderRadius 적용
    const mapImg = canvasElement.querySelector('[role="img"]');
    await expect(mapImg).not.toBeNull();
    const cardArea = mapImg!.parentElement as HTMLElement;
    const cs = getComputedStyle(cardArea);
    await expect(cs.borderStyle).toBe('solid');
    await expect(cs.borderTopLeftRadius).not.toBe('');
    await expect(cs.borderTopLeftRadius).not.toBe('0px');

    // 3. 제목/지도 슬롯 렌더 확인
    await expect(await canvas.findByTestId('map-block-title')).toBeVisible();
  },
};

/** stacked 레이아웃: 중앙 정렬 헤더 밴드 위에 카드 크롬 없는 풀블리드 지도 (auto 1fr 2행 그리드) */
export const LayoutStacked: Story = {
  args: {
    layout: 'stacked',
    title: '찾아오시는 길',
    address: '서울특별시 종로구 종로 1\n빵또 광화문점',
    markers: [{ label: '빵또 광화문점', x: 50, y: 50 }],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const section = canvasElement.querySelector('[data-block="map-block"]');
    await expect(section).not.toBeNull();
    await expect(section?.getAttribute('data-bbangto-mapblock-layout')).toBe('stacked');

    // 2a. load-bearing: inner가 2행 그리드(auto 1fr → 트랙 2개)
    const inner = canvasElement.querySelector('.map-block__inner') as HTMLElement;
    await expect(inner).not.toBeNull();
    const innerCs = getComputedStyle(inner);
    await expect(innerCs.display).toBe('grid');
    const rowTracks = innerCs.gridTemplateRows.trim().split(/\s+/).filter(Boolean);
    await expect(rowTracks.length).toBeGreaterThanOrEqual(2);

    // 2b. load-bearing: 지도 영역에 카드 크롬 없음 (border none — card와 구분)
    const mapImg = canvasElement.querySelector('[role="img"]');
    await expect(mapImg).not.toBeNull();
    const mapArea = mapImg!.parentElement as HTMLElement;
    const areaCs = getComputedStyle(mapArea);
    await expect(areaCs.borderStyle).toBe('none');

    // 3. 헤더 밴드(제목 + muted 주소) 슬롯 렌더 확인
    await expect(await canvas.findByTestId('map-block-title')).toBeVisible();
    await expect(await canvas.findByTestId('map-block-address')).toBeVisible();
  },
};
