import "@sio-group/form-react/sio-form-style.css";
import {Card} from "@sio-group/ui-card";
import {useState} from "react";
import {Button} from "@sio-group/ui-core";
import {Modal} from "@sio-group/ui-modal";

import "@sio-group/ui-core/sio-core-style.css";
import "@sio-group/ui-card/sio-card-style.css";
import "@sio-group/ui-modal/sio-modal-style.css";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [count, setCount] = useState(0)

    return (
        <div style={{ padding: '2rem' }}>
            <h1>UI Demo Project</h1>

            {/* UI Core Button */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>UI Core Button</h2>
                <Button onClick={() => setCount(c => c + 1)}>
                    Clicked {count} times
                </Button>
            </section>

            {/* UI Card */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>UI Card</h2>
                <Card title="Demo Card">
                    <p>This is a card from @sio-group/ui-card</p>
                    <Button variant="secondary">Card Action</Button>
                </Card>

                <Card
                    title="Demo Card"
                    actions={[
                        {
                            type: 'button',
                            variant: 'primary',
                            label: 'Card action'
                        }
                    ]}
                    addShadow
                >
                    <p>This is a card from @sio-group/ui-card</p>
                </Card>
            </section>

            {/* UI Modal */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>UI Modal</h2>
                <Button onClick={() => setIsModalOpen(true)}>
                    Open Modal
                </Button>
                <Modal
                    show={isModalOpen}
                    close={() => setIsModalOpen(false)}
                    title="Demo Modal"
                    actions={[
                        {
                            type: 'button',
                            variant: 'primary',
                            label: 'Custom button'
                        }
                    ]}
                >
                    <p>This is a modal from @sio-group/ui-modal</p>
                </Modal>
            </section>
        </div>
    )
}

export default App;
