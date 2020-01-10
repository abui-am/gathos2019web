import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import bg from './../assets/bg.png';
import logo from './../assets/logo.png';
import { Fade, Grow, Hidden } from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import Loading from '../svg/loading';

const styles = theme => ({
  root: {
    boxShadow: '0px 8px 30px rgba(0,0,0,0.16)'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: '5px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '5px'
  },
  submit: {
    marginTop: '30px',
    marginBottom: '20px',
    height: '60px',
    backgroundColor: '#3523DB',
    color: '#fff'
  }
});

export class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      nama: '',
      sekolah: '',
      daerah: '',
      no_wa: '',
      isSubmiting: false,
      isOnMobile: window.innerWidth < 600
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidUpdate = () => {
    const { nama, sekolah, daerah, no_wa } = this.state;
    if (nama && sekolah && daerah && no_wa) {
      this.setState({
        isValid: true
      });
    } else {
      this.setState({ isValid: false });
    }
  };

  handleSignIn = e => {
    e.preventDefault();
    const { nama, sekolah, daerah, no_wa } = this.state;
    const data = { nama, sekolah, daerah, no_wa };
    this.setState({ isSubmiting: true });
    setTimeout(
      () =>
        axios
          .post('http://localhost:3000/siswa', data, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res) {
              console.log(res);
              this.dataUploaded();
            }
          })
          .catch(err => {
            console.log(err);
            this.dataNotUploaded();
          }),
      2000
    );
  };

  resetState = () => {
    this.setState({
      isValid: false,
      isSubmiting: false,
      nama: '',
      sekolah: '',
      daerah: '',
      no_wa: '',
      isSuccess: false,
      status: ''
    });
  };

  dataUploaded = () => {
    this.setState({ isSuccess: true, status: 'Data berhasil dikirim' });
    setTimeout(this.resetState, 1000);
  };

  dataNotUploaded = () => {
    this.setState({ isSuccess: true, status: 'Data tidak berhasil dikirim' });
    setTimeout(this.resetState, 3000);
  };

  updateDimensions = () => {
    this.setState({ isOnMobile: window.innerWidth < 600 });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangePhoneNumber = value => {
    this.setState({ no_wa: value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper
          className={classes.root}
          style={{ marginTop: this.state.isOnMobile ? '0px' : '50px' }}
        >
          <div className={classes.paper}>
            <Grid container alignItems="center" direction="row">
              <Grid
                item
                style={{
                  flexBasis: '500px',
                  flexGrow: 0,
                  flexShrink: 1,
                  height: this.state.isOnMobile ? '200px' : '500px',
                  backgroundImage: `url(${bg})`,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <img
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    src={logo}
                  ></img>
                  <Hidden only="xs">
                    <Typography
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}
                      component="h1"
                      variant="h4"
                    >
                      GATHERING
                    </Typography>
                    <Typography
                      component="h1"
                      variant="h4"
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}
                    >
                      {' '}
                      KETUA OSIS 2019
                    </Typography>
                  </Hidden>
                </div>
              </Grid>
              <Grid item style={{ flexShrink: 1, flexBasis: 0, flexGrow: 1 }}>
                {!this.state.isSubmiting ? (
                  <Container maxWidth="xs" alignItems="center">
                    <Fade in={!this.isSubmiting}>
                      <Typography
                        component="h1"
                        variant="h5"
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          marginTop: '20px'
                        }}
                      >
                        Selamat Datang
                      </Typography>
                    </Fade>

                    <form className={classes.form} noValidate>
                      <Grow in={!this.isSubmiting}>
                        <TextField
                          variant="standard"
                          margin="normal"
                          required
                          fullWidth
                          id="nama"
                          label="Nama Kamu"
                          name="nama"
                          autoComplete="nama"
                          autoFocus
                          value={this.state.nama}
                          onChange={e => this.handleChange(e)}
                        />
                      </Grow>
                      <Grow
                        in={!this.state.isSubmiting}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(!this.state.isSubmiting ? { timeout: 500 } : {})}
                      >
                        <TextField
                          variant="standard"
                          margin="normal"
                          required
                          fullWidth
                          id="sekolah"
                          label="Sekolah"
                          name="sekolah"
                          autoComplete="sekolah"
                          value={this.state.sekolah}
                          onChange={e => this.handleChange(e)}
                        />
                      </Grow>
                      <Grow
                        in={!this.state.isSubmiting}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(!this.state.isSubmiting ? { timeout: 1000 } : {})}
                      >
                        <TextField
                          variant="standard"
                          margin="normal"
                          required
                          fullWidth
                          name="daerah"
                          label="Daerah"
                          id="daerah"
                          autoComplete="daerah"
                          value={this.state.daerah}
                          onChange={e => this.handleChange(e)}
                        />
                      </Grow>
                      <Grow
                        in={!this.state.isSubmiting}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(!this.state.isSubmiting ? { timeout: 1500 } : {})}
                      >
                        <MuiPhoneNumber
                          fullWidth
                          required
                          id="no_wa"
                          style={{ marginTop: '16px', marginBottom: '8px' }}
                          name="no_wa"
                          label="Nomor Whatsapp"
                          data-cy="no_wa"
                          defaultCountry={'id'}
                          value={this.state.no_wa}
                          onChange={this.handleChangePhoneNumber}
                        />
                      </Grow>
                      <Grow
                        in={!this.state.isSubmiting}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(!this.state.isSubmiting ? { timeout: 2000 } : {})}
                      >
                        <Button
                          type="submit"
                          fullWidth
                          style={{ borderRadius: '30px' }}
                          variant="contained"
                          color="secondary"
                          className={classes.submit}
                          disabled={!this.state.isValid}
                          onClick={this.handleSignIn}
                        >
                          Sign In
                        </Button>
                      </Grow>
                    </form>
                  </Container>
                ) : !this.state.isSuccess ? (
                  <Container maxWidth="xs" alignItems="center">
                    <Grow in={this.state.isSubmiting}>
                      <Grid direction="column">
                        <Typography
                          container="h1"
                          variant="h4"
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }}
                        >
                          Halo Kak
                        </Typography>
                        <Typography
                          variant="h4"
                          container="h1"
                          style={{ textAlign: 'center', fontWeight: '400' }}
                        >
                          {this.state.nama}
                        </Typography>
                        <Typography
                          style={{ marginTop: '20px', textAlign: 'center' }}
                        >
                          Memproses...., tunggu sebentar yak :)
                        </Typography>
                        <Typography
                          style={{ marginTop: '20px', textAlign: 'center' }}
                        >
                          <Loading />
                        </Typography>
                      </Grid>
                    </Grow>
                  </Container>
                ) : (
                  <div>
                    <Fade in={this.state.status}>
                      <Typography
                        variant="h5"
                        container="h1"
                        style={{ textAlign: 'center', fontWeight: '400' }}
                      >
                        {this.state.status}
                      </Typography>
                    </Fade>
                    <Fade in={this.state.status === 'Data berhasil dikirim'}>
                      <Typography
                        style={{ textAlign: 'center', fontWeight: '400' }}
                      >
                        Silahkan masuk
                      </Typography>
                    </Fade>
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(SignIn);
