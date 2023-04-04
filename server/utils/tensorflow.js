import * as tf from '@tensorflow/tfjs';

// Define a model for linear regression.
const model = tf.sequential();

model.add(tf.layers.dense({units: 1,inputShape: [2]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training. (y = 2x + 3z - 3)
const xs = tf.tensor2d([[1,2], [2,4], [0,9], [5,6], [7,8], [3,4]], [6,2]); // arguments
const ys = tf.tensor2d([5,13, 24, 25, 35, 15], [6,1]); // answer

const history = await model.fit(xs, ys, {
    epochs: 1000,
    batchSize: 2,
  });

const input = tf.tensor2d([[0,1]])
const prediction = model.predict(input)
prediction.print()