    <?php

    use app\models\Inventory;
    use app\models\Rental;
    use app\models\Film;
    use app\models\Store;
    use app\models\Customer; // Add the Customer model import
    use app\models\Staff;
    use yii\helpers\Html;
    use yii\helpers\Url;
    use kartik\depdrop\DepDrop;
    use yii\helpers\ArrayHelper;

    use yii\widgets\ActiveForm;
    use kartik\select2\Select2;
    use kartik\datetime\DateTimePicker;


    /** @var yii\web\View $this */
    /** @var app\models\Rental $model */
    /** @var yii\widgets\ActiveForm $form */

    // Fetch inventory IDs from the database
    
    $inventoryIds = Inventory::find()->select('inventory_id')->column();
    $filmData = Film::find()->select(['film_id', 'title'])->asArray()->all();
    $filmList = \yii\helpers\ArrayHelper::map($filmData, 'film_id', 'title');
    $customerIds = Customer::find()->select('first_name')->column();
    $staffIds = Staff::find()->select('first_name')->column();
    echo Html::hiddenInput('input-type-1', 'Additional value 1', ['id' => 'input-type-1']);
    ?>


    <div class="rental-form">

        <?php $form = ActiveForm::begin(); ?>

        <?= $form->field($model, 'rental_date')->widget(DateTimePicker::class, [
            'options' => ['placeholder' => 'Enter event time ...'],
            'pluginOptions' => [
                'autoclose' => true
            ]
        ]); ?>

        <?= $form->field($model, 'inventory_id')->widget(Select2::class, [
            'data' => $filmList,
            'options' => ['placeholder' => 'Select an inventory item ...'],
            'pluginOptions' => [
                'allowClear' => true
            ],
        ]); ?>


        <?= $form->field($model, 'customer_id')->widget(DepDrop::class, [
            'options' => ['placeholder' => 'Select a customer ...'],
            'pluginOptions' => [
                'depends' => ['rental-inventory_id'], // Bergantung pada dropdown inventory_id
                'placeholder' => 'Select a customer ...',
                'url' => Url::to(['/rental/get-customers']) // Aksi controller untuk mendapatkan daftar customer
            ],
        ]); ?>


        <?= $form->field($model, 'return_date')->widget(DateTimePicker::class, [
            'options' => ['placeholder' => 'Enter event time ...'],
            'pluginOptions' => [
                'autoclose' => true
            ]
        ]); ?>

        <?= $form->field($model, 'staff_id')->widget(DepDrop::class, [
            'options' => ['placeholder' => 'Select a staff ...'],
            'pluginOptions' => [
                'depends' => ['rental-customer_id'], // Bergantung pada dropdown customer_id
                'placeholder' => 'Select a staff ...',
                'url' => Url::to(['/rental/get-staffs']) // Aksi controller untuk mendapatkan daftar staff
            ],
        ]); ?>

        <?= $form->field($model, 'last_update')->textInput() ?>

        <div class="form-group">
            <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
        </div>

        <?php ActiveForm::end(); ?>

    </div>