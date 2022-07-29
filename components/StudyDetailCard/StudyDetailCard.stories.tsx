import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StudyDetailCard } from ".";

export default {
  title: "components/StudyDetailCard",
  component: StudyDetailCard,
} as ComponentMeta<typeof StudyDetailCard>;

const Template: ComponentStory<typeof StudyDetailCard> = (args) => (
  <StudyDetailCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};
