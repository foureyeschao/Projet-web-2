import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Auth from '../../route/Auth.js'
import { FormattedMessage } from 'react-intl'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Connexion = () => {

    const navigate = useNavigate()
    const {login} = Auth()
    const initialValues = {
        courriel: '',
        motDePasse: ''
    }

    const validationSchema = Yup.object({
        courriel: Yup.string().email('register.form_courriel_invalide').required('register.form_courriel_required'),
        motDePasse: Yup.string().min(6,'register.form_password_invalide').required('register.form_password_required')
    });

    const onSubmit = async (valeurs) => {
      await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/v1/login',
            data: valeurs
        })
            .then(res => {
                if(res.data.errno === 704) {
                    toast.error(<FormattedMessage id={"connexion.form_courriel_inexistant"} /> , {
                        position: toast.POSITION.TOP_CENTER
                    })
                }

                else if(res.data.errno === 705) {
                    toast.error(<FormattedMessage id={"register.form_mot_de_passe_existe"} /> , {
                        position: toast.POSITION.TOP_CENTER
                    })
                }

                else {
                    const uInfo = res.data.data.utilisateurInfo
                    localStorage.setItem("nomAuthed",uInfo.nomDeUtilisateur)
                    localStorage.setItem("idAuthed",uInfo.idUtilisateur)
                    let token =res.data.data.token
                    localStorage.setItem("tk",token)
                    login(uInfo.nomDeUtilisateur, uInfo.privilege)

                    const id = uInfo.idUtilisateur;
                    const hasProfil = uInfo.hasProfil;
                    const nom = uInfo.nomDeUtilisateur
                    if(hasProfil) {
                        navigate('/app/client-index')
                    }
                    else { navigate(`/app/inscription-client/${id}`)}
                }
            })
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })


    return (
        <form className='form px-5 border-opacity-25 rounded' style={{ marginTop: '15vh' }} onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <h1 className='title-form font-weight-bold text-center m-4 p-3'><FormattedMessage id="connexion.form_titre" /></h1>
            <div className="mb-3">
                <label htmlFor="courriel" className="form-label"><FormattedMessage id="register.form_courriel" /></label>
                <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps('courriel')}
                />
                <span className='text-danger'>{formik.touched.courriel && formik.errors.courriel ? <FormattedMessage id={formik.errors.courriel} />: ''}</span>
            </div>
            <div className="mb-3">
                <label htmlFor="mot-de-passe" className="form-label"><FormattedMessage id="register.form_mot_de_passe" /></label>
                <input
                    type="password"
                    className="form-control"
                    {...formik.getFieldProps('motDePasse')}
                />
                <span className='text-danger'>{formik.touched.motDePasse && formik.errors.motDePasse ? <FormattedMessage id={formik.errors.motDePasse} />  : ''}</span>
            </div>

            <div className="mb-3 ">
                <button type="submit" className="btn btn-primary"><FormattedMessage id="register.form_bt_inscrire" /></button>
                <Link className='btn btn-primary m-3' to='/app'><FormattedMessage id="register.form_bt_retour" /></Link>
            </div>
        </form>
    );
}

export default Connexion;
