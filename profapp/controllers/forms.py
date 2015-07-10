from flask.ext.wtf import Form
from wtforms import TextAreaField,StringField
from wtforms.validators import DataRequired

class ArticleForm(Form):
    name = StringField('name', validators=[DataRequired()])
    article = TextAreaField('article', validators=[DataRequired()])
