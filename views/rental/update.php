<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Rental $model */

$this->title = 'Update Rental: ' . $model->rental_id;
$this->params['breadcrumbs'][] = ['label' => 'Rentals', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->rental_id, 'url' => ['view', 'rental_id' => $model->rental_id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="rental-update">

    <!-- <h1><?= Html::encode($this->title) ?></h1> -->

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
