var React = require('react');

module.exports = React.createClass({
	render: function() {
		console.log(this.props.query);
		return (
				<div>
				<Header user={this.props.session.user} msg={this.props.query.msg} />
				<Body data={this.props.data} values={this.props.values} />
				</div>
				);
	}
});

//Header -->
var Header = React.createClass({
	render: function(){
		return(
				<div>
				<Menu msg={this.props.msg} />
				<User user={this.props.user} />
				<Search />
				</div>
				)
	}
});
var Menu = React.createClass({
	render: function() {
		return (
				<div>
				<h1>Piattaforma di aste</h1>
				<nav className="navbar navbar-default">
				<div className="container-fluid">
				<div className="navbar-header">
				<a className="navbar-brand" href="#">Brand</a>
				</div>
				</div>
				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				</div>
				</nav>
				<div>{this.props.msg}</div>
				</div>
				)
	}
});
var User = React.createClass({
	render: function() {
		return (
				(this.props.user)? <LogoutButton/> : <LoginButton />
				)
	}
});

var LogoutButton = React.createClass({
	render: function() {
		return (
				<form action="/logout">
				<input type="submit" className="button" value="Logout" />
				</form>
				)
	}
});

var LoginButton = React.createClass({
	clickHandler: function() {
		alert("Doing Login");
	},
	render: function() {
		return (
				<form method="post" action="/login">
				User: 
				<input type="text" name="Username" className="button"/>
				Password: 
				<input type="password" name="Password" className="button"/>
				<input type="submit" className="button" value="Login" />
				</form>
				)
	}
});

var Search = React.createClass({
	render: function() {
		return (
				<form action="/search" type="GET">
				<input name="query"/>
				<input type="submit" value="search" placeholder="Search" />
				</form>
				)
	}
});

//<--End Header
//Body -->

var Body = React.createClass({
	render: function() {
		var El = Empty;
		switch(this.props.data.action) {
			case 'createForm':
				El = Form;
				break;
			case 'createList':
				El = List;
				break;
		}
		return (
				<div>
				<El cmd={this.props.data} values={this.props.values} />
				</div>
				)
	}
});

//All user input forms
var Form = React.createClass({
	render: function() {
		var form = this.props.cmd;
		return (
				<div>
				<h1>{form.title}</h1>
				<form action={form.formAction} method={form.formMethod}>
				<FormFields form={form.form} />
				<input type="submit" value={form.SubmitText}/>
				</form>
				</div>
				)
	}
});

var FormFields = React.createClass({
	render: function() {
		var form = this.props.form;
		var fields = form.map(function(feld, index){
			if(feld.sub === undefined) {
				return(
					<div>
						<label>{feld.label}: 
						<input type="text" name={feld.name} />
						</label>
					</div>
					);
			}
					else
				return(
						<div>
						<h2>{feld.label}</h2>
						<FormFields form={feld.sub} />
						</div>
						)
		});
		return 	(
				<div>
				{fields}
				</div>
				)
	}
});

var TableRow = React.createClass({
	render: function() {
		var row = this.props.row;
		var header= this.props.header;
		var line = header.map(function(el){
			return(
					<td>
						{row[el.name]}
					</td>
					)
		});
		return (
			<tr>
			{line}
			</tr>
			)
		}
});

var TableHeader = React.createClass({
	render: function() {
		var header= this.props.header;
		var head = header.map(function(el){
			return(
					<th>
						{el.label}
					</th>
					)
		});
		return (
				<thead>
				{head}
				</thead>
			)
		}
});
var List = React.createClass({
	render: function() {
		var cmd = this.props.cmd;
		var values = this.props.values;
		var table = values.map(function(row){
			return (
					<TableRow row={row} header={cmd.header}/>
					)
		});
		return (
				<table className="table table-striped">
				<TableHeader header={cmd.header}/>
				<tbody>
				{table}
				</tbody>
				</table>
				)
	}
});



var Empty = React.createClass({
	render: function() {
		return (
				<div />
				)
	}
});

//<-- End Body
