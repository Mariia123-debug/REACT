import { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";

const { Title, Text } = Typography;

export default function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || !trimmedDescription) return;

    setSubmitted({
      name: trimmedName,
      description: trimmedDescription,
    });

    setName("");
    setDescription("");
  };

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: 16 }}>
      <Title level={2} style={{ marginTop: 0 }}>
        Ant Design Form
      </Title>

      <Card style={{ marginBottom: 16 }}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            required
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            required
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea
              value={description}
              placeholder="Enter description"
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>

      {submitted && (
        <Card title="Submitted data">
          <Text strong>Name:</Text> <Text>{submitted.name}</Text>
          <br />
          <Text strong>Description:</Text>
          <div style={{ marginTop: 6 }}>{submitted.description}</div>
        </Card>
      )}
    </div>
  );
}