<?php

use app\models\Customer;
use app\models\Staff;
use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\ActiveForm;
use kartik\daterange\DateRangePicker;
use kartik\select2\Select2;

/** @var yii\web\View $this */
/** @var app\models\RentalSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Rental Report';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="rental-index">
<?= Html::button('Hide/Show Search Form', ['class' => 'btn btn-primary', 'id' => 'toggleSearchFormBtn']) ?>
    <div class="rental-search">
        <?php $form = ActiveForm::begin([
            'action' => ['index'],
            'method' => 'get',
        ]); ?>

        <?= $form->field($searchModel, 'rental_date')->widget(DateRangePicker::class, [
            'convertFormat' => true,
            'pluginOptions' => [
                'locale' => ['format' => 'Y-m-d']
            ]
        ])->label('Date Range'); ?>

        <?php
        // Ambil daftar customer dari database atau sumber data lainnya
        $customerList = Customer::find()->select(['customer_id', 'first_name', 'last_name'])->asArray()->all();

        // Bentuk array yang sesuai untuk Select2
        $customerData = \yii\helpers\ArrayHelper::map($customerList, 'customer_id', function ($model) {
            return $model['first_name'] . ' ' . $model['last_name'];
        });
        ?>

        <?= $form->field($searchModel, 'customer_id')->widget(Select2::class, [
            'model' => $searchModel,
            'attribute' => 'customer_id',
            'data' => $customerData,
            
            'options' => ['placeholder' => 'Select customer...', 'multiple' => true,'id'=>'customer_id'],
            'pluginOptions' => [
                'allowClear' => true,
            ],
        ]); ?>

        <?php
        // Ambil daftar staff dari database atau sumber data lainnya
        $staffList = Staff::find()->select(['staff_id', 'first_name', 'last_name'])->asArray()->all();

        // Bentuk array yang sesuai untuk Select2
        $staffData = \yii\helpers\ArrayHelper::map($staffList, 'staff_id', function ($model) {
            return $model['first_name'] . ' ' . $model['last_name'];
        });
        ?>

        <?= $form->field($searchModel, 'staff_id')->widget(Select2::class, [
            'model' => $searchModel,
            'attribute' => 'staff_id',
            'data' => $staffData,
            'options' => ['placeholder' => 'Select staff...', 'multiple' => true,'id'=>'staff_id'],
            'pluginOptions' => [
                'allowClear' => true,
            ],
        ]); ?>

        <!-- Tambahkan field pencarian lainnya sesuai kebutuhan -->

        <div class="form-group">
            <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
            <?= Html::resetButton('Reset', ['class' => 'btn btn-default', 'id' =>'resetBtn'])?>
        </div>

        <?php ActiveForm::end(); ?>
    </div>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        //'filterModel' => $searchModel, // Aktifkan filter model
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            'rental_id',
            'rental_date',
            //'inventory_id',
            //'customer_id',
            'customerName',
            // 'filmTitle',
            'staffName',
            'last_update',
        ],
    ]); ?>

</div>
<?php
$this->registerCss("
    .rental-search {
        display: none;
    }
");

$this->registerJs("
    $(document).ready(function() {
        $('#toggleSearchFormBtn').click(function() {
            $('.rental-search').toggle();
        });
    });
");
?>
<?php
$this->registerJs("
    $('#resetBtn').click(function() {
        // Reset nilai Date Range Picker
        $('#rental_date').val('');

        // Reset nilai Select2 dan trigger change event
        $('#customer_id').val([]).trigger('change');
        console.log(123123)
        $('#staff_id').val('').trigger('change');
    });
");
?>
