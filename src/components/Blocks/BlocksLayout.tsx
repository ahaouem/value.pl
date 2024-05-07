import { TBlock, BlockType } from "./TBlock";
import Block from "./Block";

export default function BlocksLayout() {
  const mock_data: TBlock[] = [
    {
      id: 1,
      size: {
        width: 2,
        height: 1,
      },
      data: '"Hello World"',
      data_type: BlockType.Quote,
    },
  ];
  return (
    <section className="grid w-full grid-cols-3 grid-rows-2">
      {mock_data.map((block) => (
        <Block
          key={block.id}
          id={block.id}
          size={block.size}
          data={block.data}
          data_type={block.data_type}
        />
      ))}
    </section>
  );
}
