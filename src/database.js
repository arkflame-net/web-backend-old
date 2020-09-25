import { connect } from 'mongoose';
import { database_uri } from './config.json'

const settings = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

connect(database_uri, settings)
    .then(db => console.log("[DB] Successfully connected"))
    .catch(error => console.error("[DB] Error connecting:\n" + error));