<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/** @var yii\web\View $this */
/** @var app\models\FilmActor $model */

$this->title = $model->actor_id;
$this->params['breadcrumbs'][] = ['label' => 'Film Actors', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="film-actor-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'actor_id' => $model->actor_id, 'film_id' => $model->film_id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'actor_id' => $model->actor_id, 'film_id' => $model->film_id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'actor_id',
            'film_id',
            'last_update',
        ],
    ]) ?>

</div>
