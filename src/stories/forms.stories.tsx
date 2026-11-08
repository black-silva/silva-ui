import {
  Button,
  Checkbox,
  Field,
  FieldError,
  FieldHelper,
  Form,
  Input,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  Slider,
  Switch,
  Text,
  TextArea,
  ToggleGroup,
  ToggleGroupItem,
  XStack,
  YStack,
} from '../index';
import { renderStory } from './render';

export default { title: 'Components/Forms' };

export const TextFields = () => renderStory(
  <YStack gap="medium" style={{ width: '22rem' }}>
    <Field helperText="We only use this for account notices.">
      <Label for="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </Field>
    <Field error="A display name is required.">
      <Label for="display-name">Display name</Label>
      <Input id="display-name" aria-invalid="true" />
    </Field>
    <Field><Label for="bio">Bio</Label><TextArea id="bio" placeholder="Tell us about yourself" /></Field>
  </YStack>,
);

export const SelectionControls = () => renderStory(
  <YStack gap="medium">
    <Checkbox defaultChecked>Send product updates</Checkbox>
    <Switch defaultChecked>Enable notifications</Switch>
    <RadioGroup name="plan" defaultValue="pro">
      <RadioGroupItem name="plan" value="starter">Starter</RadioGroupItem>
      <RadioGroupItem name="plan" value="pro" defaultChecked>Pro</RadioGroupItem>
      <RadioGroupItem name="plan" value="team">Team</RadioGroupItem>
    </RadioGroup>
    <ToggleGroup type="single"><ToggleGroupItem value="left" data-active="true">Left</ToggleGroupItem><ToggleGroupItem value="center">Centre</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem></ToggleGroup>
  </YStack>,
);

export const SelectAndRange = () => renderStory(
  <YStack gap="medium" style={{ width: '22rem' }}>
    <Field><Label for="role">Role</Label><Select id="role" defaultValue="designer"><option value="developer">Developer</option><option value="designer">Designer</option><option value="founder">Founder</option></Select></Field>
    <Field><Label for="volume">Volume</Label><Slider min={0} max={100} value={60} /><FieldHelper>60%</FieldHelper></Field>
    <Progress value={60} />
  </YStack>,
);

export const CompleteForm = () => renderStory(
  <Form onSubmit={(event: Event) => event.preventDefault()}>
    <YStack gap="medium" style={{ width: '22rem' }}>
      <Field><Label for="name">Name</Label><Input id="name" placeholder="Your name" /></Field>
      <Field><Label for="message">Message</Label><TextArea id="message" placeholder="How can we help?" /></Field>
      <Checkbox defaultChecked>I agree to receive a reply.</Checkbox>
      <XStack gap="small"><Button type="submit">Send message</Button><Button variant="outline" type="reset">Clear</Button></XStack>
    </YStack>
  </Form>,
);

export const FieldErrorState = () => renderStory(
  <Field error="A valid email address is required." style={{ width: '22rem' }}>
    <Label for="error-email">Email address</Label>
    <Input id="error-email" type="email" aria-invalid="true" value="not-an-email" />
    <FieldError>A valid email address is required.</FieldError>
  </Field>,
);

export const Disabled = () => renderStory(<YStack gap="small"><Input disabled placeholder="Unavailable" /><Select disabled><option>Unavailable</option></Select><Checkbox disabled>Unavailable</Checkbox><Switch disabled>Unavailable</Switch><Text color="muted">Disabled controls preserve their state clearly.</Text></YStack>);
