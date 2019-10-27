import './css/SystemSettingWindow.css';
import { Window, Content, Buttons, Form, FormControl, Label, Button, Select } from '../../third_party';

/**
 * 系统设置窗口
 * @author tengge / https://github.com/tengge1
 */
class SystemSettingWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roles: {},
            registerRole: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        const { roles, registerRole } = this.state;

        return <Window
            className={'SystemSettingWindow'}
            title={_t('System Setting')}
            style={{ width: '320px', height: '200px' }}
            mask={false}
            onClose={this.handleClose}
               >
            <Content>
                <Form>
                    <FormControl>
                        <Label>{_t('Register Default Role')}</Label>
                        <Select name={'registerRole'}
                            options={roles}
                            value={registerRole}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </Form>
            </Content>
            <Buttons>
                <Button onClick={this.handleSave}>{_t('OK')}</Button>
                <Button onClick={this.handleClose}>{_t('Cancel')}</Button>
            </Buttons>
        </Window>;
    }

    componentDidMount() {
        fetch(`/api/Config/Get`).then(response => {
            response.json().then(json => {
                this.setState({
                    registerRole: json.Data.DefaultRegisterRole
                });
            });
        });

        fetch(`/api/Role/List?pageSize=10000`).then(response => {
            response.json().then(json => {
                let roles = {};
                json.Data.rows.forEach(n => {
                    roles[n.ID] = this.renderRoleName(n.Name);
                });
                this.setState({
                    roles
                });
            });
        });
    }

    handleChange(value, name) {
        this.setState({
            [name]: value
        });
    }

    handleSave() {
        const { registerRole } = this.state;

        fetch(`/api/Config/Save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `DefaultRegisterRole=${registerRole}`
        }).then(response => {
            response.json().then(json => {
                app.toast(_t(json.Msg));
                this.handleClose();
            });
        });
    }

    handleClose() {
        app.removeElement(this);
    }

    renderRoleName(value) {
        if (value === 'Administrator' ||
            value === 'User' ||
            value === 'Guest') {
            return _t(value);
        }
        return value;
    }
}

export default SystemSettingWindow;