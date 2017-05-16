import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: ''
        }
    }

    onChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        const options = map(timezones, (timezone, key) => <option key={timezone} value={timezone}>{key}</option>);
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h1>Join our community!</h1>

                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange.bind(this)}
                        type="text"
                        name="username"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange.bind(this)}
                        type="email"
                        name="email"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange.bind(this)}
                        type="password"
                        name="password"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange.bind(this)}
                        type="password"
                        name="passwordConfirmation"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Timezone</label>
                    <select
                        className="form-control"
                        name="timezone"
                        onChange={this.onChange.bind(this)}
                        value={this.state.timezone}
                    >
                        <option value="" disabled>Choose Your Timezon</option>
                        {options}
                    </select>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

export default SignupForm;